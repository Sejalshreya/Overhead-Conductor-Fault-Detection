from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from datetime import datetime, timedelta
import json

app = Flask(__name__)
app.secret_key = "supersecretkey"

# -------------------------
# Dummy Users
# -------------------------
users = {
    "officer": {"password": "officer123", "role": "Officer", "name": "Saadgi Puniwala"},
    "staff01": {"password": "komal123", "role": "Staff", "name": "Komal Kumari"},
    "staff02": {"password": "mayurika123", "role": "Staff", "name": "Mayurika Das"},
    "staff03": {"password": "shreya123", "role": "Staff", "name": "Shreya Jirankali"},
    "staff04": {"password": "sejal123", "role": "Staff", "name": "Sejal Shreya"},
    "staff05": {"password": "navami123", "role": "Staff", "name": "Navami S"}
}

user_map = {
    'saadgi': 'officer',
    'komal': 'staff01',
    'mayurika': 'staff02',
    'shreya': 'staff03',
    'sejal': 'staff04',
    'navami': 'staff05'
}

# -------------------------
# Staff List
# -------------------------
staff_list = [
    {"username": "staff01", "fullname": "Komal Kumari", "phone": "9199367067", "email": "eng24cy0124@dsu.edu.in", "role": "Staff"},
    {"username": "staff02", "fullname": "Mayurika Das", "phone": "7439761950", "email": "eng24ad0041@dsu.edu.in", "role": "Staff"},
    {"username": "staff03", "fullname": "Shreya Jirankali", "phone": "8767000519", "email": "eng24cs0656@dsu.edu.in", "role": "Staff"},
    {"username": "staff04", "fullname": "Sejal Shreya", "phone": "7091177708", "email": "eng24ds0153@dsu.edu.in", "role": "Staff"},
    {"username": "staff05", "fullname": "Navami S", "phone": "7975148392", "email": "eng24am0232@dsu.edu.in", "role": "Staff"}
]

# -------------------------
# Pole Data
# -------------------------
pole_data = {
    "pole001": {
        "status": "Healthy",
        "acc": [0.1, 0.2, 9.8],
        "gyro": [0.0, 0.0, 0.0],
        "current": "5.2A",
        "lat": 12.9716,
        "lng": 77.5946,
        "location": "MG Road, Bangalore"
    },
    "pole002": {
        "status": "Warning",
        "acc": [1.2, 0.8, 8.9],
        "gyro": [0.5, 0.3, 0.1],
        "current": "3.8A",
        "lat": 12.9352,
        "lng": 77.6245,
        "location": "BTM Layout, Bangalore"
    },
    "pole003": {
        "status": "Alert",
        "acc": [2.5, 1.8, 7.2],
        "gyro": [1.2, 0.9, 0.5],
        "current": "1.2A",
        "lat": 12.9279,
        "lng": 77.6271,
        "location": "Jayanagar, Bangalore"
    }
}

# -------------------------
# Task System
# -------------------------
tasks = []
task_id_counter = 1

# -------------------------
# Routes
# -------------------------

@app.route('/')
def home():
    if 'user' in session:
        username = session['user']
        user = users.get(username)
        if user['role'] == "Officer":
            return redirect(url_for('dashboard'))
        else:
            return redirect(url_for('person', username=username))
    return render_template("index.html", error=None)

@app.route('/login', methods=['POST'])
def login():
    username = request.form.get('username', '').strip().lower()
    password = request.form.get('password', '').strip()
    
    user_key = user_map.get(username)
    
    if user_key and users.get(user_key) and users[user_key]['password'] == password:
        session['user'] = user_key
        if users[user_key]['role'] == "Officer":
            return redirect(url_for('dashboard'))
        else:
            return redirect(url_for('person', username=user_key))
    
    error = "Invalid username or password. Please try again."
    return render_template("index.html", error=error)

@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('home'))

@app.route('/dashboard')
def dashboard():
    if 'user' not in session:
        return redirect(url_for('home'))
    username = session['user']
    user = users.get(username)
    return render_template("dashboard.html", staff_list=staff_list, user=user, pole_data=pole_data)

@app.route('/staff')
def staff_management():
    if 'user' not in session:
        return redirect(url_for('home'))
    username = session['user']
    user = users.get(username)
    if user['role'] != "Officer":
        return redirect(url_for('dashboard'))
    return render_template("staff.html", staff_list=staff_list, user=user)

@app.route('/staff/add', methods=['GET', 'POST'])
def add_staff():
    if 'user' not in session:
        return redirect(url_for('home'))
    username = session['user']
    user = users.get(username)
    if user['role'] != "Officer":
        return redirect(url_for('dashboard'))
        
    if request.method == 'POST':
        new_staff = {
            "username": request.form['username'],
            "fullname": request.form['fullname'],
            "phone": request.form['phone'],
            "email": request.form['email'],
            "role": request.form['role']
        }
        staff_list.append(new_staff)
        return redirect(url_for('staff_management'))

    return render_template("staffadd.html", user=user)

@app.route('/staff/edit/<username>', methods=['GET', 'POST'])
def edit_staff(username):
    if 'user' not in session:
        return redirect(url_for('home'))
    user = users.get(session['user'])
    if user['role'] != "Officer":
        return redirect(url_for('dashboard'))
        
    staff_member = next((s for s in staff_list if s['username'] == username), None)
    if not staff_member:
        return f"Staff {username} not found."

    if request.method == 'POST':
        staff_member['fullname'] = request.form['fullname']
        staff_member['phone'] = request.form['phone']
        staff_member['email'] = request.form['email']
        staff_member['role'] = request.form['role']
        return redirect(url_for('staff_management'))

    return render_template("staffedit.html", staff_member=staff_member, user=user)

@app.route('/staff/delete/<username>')
def delete_staff(username):
    if 'user' not in session:
        return redirect(url_for('home'))
    user = users.get(session['user'])
    if user['role'] != "Officer":
        return redirect(url_for('dashboard'))
        
    global staff_list
    staff_list = [s for s in staff_list if s['username'] != username]
    return redirect(url_for('staff_management'))

@app.route('/person/<username>')
def person(username):
    if 'user' not in session:
        return redirect(url_for('home'))
    
    current_user_key = session['user']
    current_user = users.get(current_user_key)
    
    # Users can only view their own tasks page
    if current_user_key != username and current_user['role'] != 'Officer':
        return "Access denied", 403
    
    # Get tasks for this user
    user_tasks = [task for task in tasks if task['assigned_to'] == username]
    
    return render_template("person.html", username=username, tasks=user_tasks, user=current_user)

@app.route('/pole')
def pole():
    if 'user' not in session:
        return redirect(url_for('home'))
    pole_id = request.args.get('poleId', 'pole001')
    pole_info = pole_data.get(pole_id, pole_data['pole001'])
    user = users.get(session['user'])
    return render_template("pole.html", poleId=pole_id, pole_info=pole_info, staff_list=staff_list, user=user)

@app.route('/data')
def lora_data():
    if 'user' not in session:
        return redirect(url_for('home'))
    # Simulate LoRa data
    return jsonify({
        "raw": "LORA,12345,1.2,3.4,5.6",
        "payload": "Voltage: 230V, Current: 5.2A",
        "rssi": "-87 dBm",
        "snr": "10.5 dB"
    })

@app.route('/assign-task', methods=['POST'])
def assign_task():
    if 'user' not in session:
        return redirect(url_for('home'))
    
    data = request.get_json()
    staff_id = data['staff']
    pole_id = data['pole_id']
    due_date = data['due_date']
    
    global task_id_counter
    
    # Create new task
    new_task = {
        'id': task_id_counter,
        'pole_id': pole_id,
        'assigned_to': staff_id,
        'due_date': due_date,
        'status': 'Assigned',
        'assigned_date': datetime.now().strftime('%Y-%m-%d'),
        'location': pole_data.get(pole_id, {}).get('location', 'Unknown Location')
    }
    
    tasks.append(new_task)
    task_id_counter += 1
    
    return jsonify({
        "message": f"Task assigned to {staff_id} for pole {pole_id}",
        "success": True
    })
    
@app.route('/complete-task/<int:task_id>', methods=['POST'])
def complete_task(task_id):
    if 'user' not in session:
        return jsonify({"success": False, "message": "Not logged in"})
    
    # Find the task
    task = next((t for t in tasks if t['id'] == task_id), None)
    
    if not task:
        return jsonify({"success": False, "message": "Task not found"})
    
    # Check if current user is assigned to this task
    if session['user'] != task['assigned_to']:
        return jsonify({"success": False, "message": "Not authorized"})
    
    # Update task status
    task['status'] = 'Completed'
    task['completed_date'] = datetime.now().strftime('%Y-%m-%d')
    
    return jsonify({"success": True, "message": "Task marked as completed"})

@app.route('/api/tasks/<username>')
def get_user_tasks(username):
    if 'user' not in session:
        return jsonify([])
    
    user_tasks = [task for task in tasks if task['assigned_to'] == username]
    return jsonify(user_tasks)

if __name__ == "__main__":
    app.run(debug=True, port=5001)