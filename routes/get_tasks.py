from flask import jsonify, request
from app import app, Session
from models import Task

@app.route('/api/tasks')
def get_tasks():
    # Start a new session
    session = Session()

    # Get the offset, limit, sort field, sort direction, and status from the request parameters
    offset = request.args.get('offset', default=0, type=int)
    limit = request.args.get('limit', default=3, type=int)
    sort_field = request.args.get('sort_field', default='id_task', type=str)
    sort_direction = request.args.get('sort_direction', default='asc', type=str)
    status = request.args.get('status', default=None, type=str)

    # Check if the sort direction is valid, otherwise set it to 'asc' by default
    if sort_direction not in ['asc', 'desc']:
        sort_direction = 'asc'

    # Define the allowed sort fields and check if the provided sort field is valid, otherwise set it to 'id' by default
    allowed_sort_fields = ['id', 'username', 'email', 'task_text']
    if sort_field not in allowed_sort_fields:
        sort_field = 'id'

    # Define the sort expression based on the sort direction and sort field
    if sort_direction == 'asc':
        sort_expr = getattr(Task, sort_field)
    else:
        sort_expr = getattr(Task, sort_field).desc()

    # Build the base query
    query = session.query(Task)

    # Apply status filtering if provided
    if status == 'completed':
        query = query.filter(Task.status == True)
    elif status == 'incomplete':
        query = query.filter(Task.status == False)

    # Execute the query with sorting, offset, and limit
    tasks = query.order_by(sort_expr).offset(offset).limit(limit).all()

    # Close the session
    session.close()

    # Prepare the list of tasks
    task_list = []
    for task in tasks:
        task_dict = {
            'id': task.id,
            'username': task.username,
            'email': task.email,
            'task_text': task.task_text,
            'status': task.status,
            'edited_by_admin': task.edited_by_admin
        }
        task_list.append(task_dict)

    # Return the list of tasks as JSON response
    return jsonify(task_list)
