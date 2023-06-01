from sqlalchemy.orm import sessionmaker
from faker import Faker
from database import User, engine  # Подставьте свой модуль и движок SQLAlchemy


# Создание сессии SQLAlchemy
Session = sessionmaker(bind=engine)
session = Session()

fake = Faker()

# Генерация и добавление тестовых данных
for _ in range(10):
    username = fake.user_name()
    password = fake.password()
    email = fake.email()

    user = User(username=username, password=password, email=email)
    session.add(user)

# Сохранение изменений в базе данных
session.commit()

# Закрытие сессии
session.close()
