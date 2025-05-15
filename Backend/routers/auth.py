from fastapi import APIRouter, HTTPException, Depends, status
from utils.jwt_handler import create_access_token, decode_access_token
from database import cursor, connection
from passlib.context import CryptContext
from schemas.auth import RegistrationUser, LoginUser, Token
from typing import Annotated, Literal
from fastapi.security import OAuth2PasswordBearer
from fastapi.responses import JSONResponse

router = APIRouter(tags=["auth"])

# this is used to check the pwd_context.verify(user.password, stored_password)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# below line will check if client sends the Token or not, it will not verify token is correct or wrong
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.post("/registring")
def register_user():
    return {
        "status":True,
        "message":"hello",
        "data":{
            "token":"",
        }
    }

@router.post("/verifying-otp")
def verifying_otp():
    return {
        "status":True,
        "message":"hello",
        "data":{
            "user_name":""
        }
    }

@router.post("/logining")
def verifying_otp():
    return {
        "status":True,
        "message":"hello",
        "data":{
            "token":""
        }
    }

@router.post("/register")
def register_user(user: RegistrationUser):
    query = f"SELECT user_name FROM users WHERE user_name = '{user.user_name}'"
    cursor.execute(query)
    # return cursor.fetchone()
    
    if cursor.fetchone():
        raise HTTPException(status_code=400, detail="User already exists")
    
    hashed_password = pwd_context.hash(user.password)
    query = f"""INSERT INTO users (user_name, name, mobile_number, email, password, role)
                VALUES ('{user.user_name}', '{user.name}', '{user.mobile_no}', '{user.email}', '{hashed_password}', '{user.role}')"""
    cursor.execute(query)
    connection.commit()
    return JSONResponse(content={"msg": "User Created"}, status_code=201)

@router.post("/login", response_model=Token)
def login_user(user: LoginUser):
    try:
        cursor.execute(f"SELECT user_name FROM users WHERE user_name = '{user.user_name}'")
        get_user = cursor.fetchone()
        if get_user:
            query = f"SELECT password FROM users WHERE user_name = '{user.user_name}'"
            cursor.execute(query)
            stored_password = cursor.fetchone()

            if not stored_password or not pwd_context.verify(user.password, stored_password[0]):
                raise HTTPException(status_code=401, detail="Invalid credentials")
            
            getrole = f"SELECT role FROM users WHERE user_name = '{user.user_name}'"
            cursor.execute(getrole)
            role = cursor.fetchone()[0]
            
            access_token = create_access_token(data={"sub": user.user_name, "role":role})
            return {"access_token": access_token, "msg": "Login successful", "token_type": "bearer", "role":role}
        
        cursor.execute(f"SELECT user_name FROM super_admin WHERE user_name = '{user.user_name}'")
        get_user = cursor.fetchone()
        if get_user:
            query = f"SELECT password FROM super_admin WHERE user_name = '{user.user_name}'"
            cursor.execute(query)
            stored_password = cursor.fetchone()

            if not stored_password or not pwd_context.verify(user.password, stored_password[0]):
                raise HTTPException(status_code=401, detail="Invalid credentials")
            
            getrole = f"SELECT role FROM super_admin WHERE user_name = '{user.user_name}'"
            cursor.execute(getrole)
            role = cursor.fetchone()[0]
            
            access_token = create_access_token(data={"sub": user.user_name, "role": role})
            return {"access_token": access_token, "msg": "Login successful", "token_type": "bearer", "role":role}
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    
@router.get("/getRoles")
def get_roles(current_user: Annotated[str, Depends(oauth2_scheme)]):
    try:
        payload = decode_access_token(current_user)
        user_name = payload["sub"]
        if not user_name:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="user not found")
        cursor.execute(f'SELECT * FROM roles')
        roles = cursor.fetchall()
        result = []
        for role in roles:
            data = {
                "id": role[0],
                "role": role[1]
            }
            result.append(data)
        return result
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token invalid")
