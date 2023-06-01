from sqlalchemy.orm import sessionmaker
from faker import Faker
from database import Task, engine

# Создание сессии SQLAlchemy
Session = sessionmaker(bind=engine)
session = Session()

fake = Faker()

# Генерация и добавление тестовых данных
for _ in range(10):
    username = fake.user_name()
    email = fake.email()
    task_text = fake.text(max_nb_chars=150)
    status = fake.boolean()

    task = Task(username=username, email=email, task_text=task_text, status=status)
    session.add(task)

# Сохранение изменений в базе данных
session.commit()

# Закрытие сессии
session.close()
