from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.responses import JSONResponse
from utils.jwt_handler import decode_access_token
from database import cursor
from passlib.context import CryptContext
from typing import Annotated
from fastapi.security import OAuth2PasswordBearer
import os


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

router = APIRouter(tags=["get_data"])

@router.get("/getSubCategories")
def get_categories(id:int, current_user: Annotated[str, Depends(oauth2_scheme)]):
    try:
        payload = decode_access_token(current_user)
        if not payload:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="token invalid")
        user_name = payload["sub"]
        user_role = payload["role"]
        if not user_name:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="user not found")
        if user_role not in ["super_admin", "inventory_manager"]:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You don't have access")
        
        get_products_query = "SELECT * FROM SubCategory WHERE (category_id = %s)"
        cursor.execute(get_products_query, (id,))
        product_data = cursor.fetchall()
        allproducts = []
        for row in product_data:
            product = {
                "sub_category_id": row[0],
                "sub_category_name": row[2]
            }
            allproducts.append(product)
        return allproducts
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.get("/getCategories")
def get_categories(current_user: Annotated[str, Depends(oauth2_scheme)]):
    try:
        payload = decode_access_token(current_user)
        if not payload:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token or authentication failed")
        
        user_name = payload["sub"]
        user_role = payload["role"]
        
        if not user_name:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
        
        if user_role not in ["super_admin", "inventory_manager"]:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You do not have permission to access this resource")
        
        get_products_query = "SELECT * FROM Category"
        cursor.execute(get_products_query)
        product_data = cursor.fetchall()
        
        allproducts = [
            {"category_id": row[0], "category_name": row[1]}
            for row in product_data
        ]
        
        return allproducts
    
    except HTTPException as http_exc:
        raise http_exc
    
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.get("/getAllProducts")
def get_all_products(current_user: Annotated[str, Depends(oauth2_scheme)]):
    try:
        payload = decode_access_token(current_user)
        # print(payload)
        user_name = payload["sub"]
        user_role = payload["role"]
        if not user_name:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="user not found")
        if user_role not in ["super_admin", "inventory_manager", "warehouse_staff"]:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="you don't have access")
        get_products_query = '''select item_name, item_price, category_name, subcategory_name, item_description, sku, barcode, barcode_url, item_img_url, current_stock, reorder_level, stock_value
                                from ItemDetails
                                inner join category on ItemDetails.item_category_id=category.category_id
                                inner join SubCategory on ItemDetails.item_subcategory_id=SubCategory.subcategory_id
                                inner join stock on ItemDetails.item_id=stock.item_id;'''
        cursor.execute(get_products_query)
        product_data = cursor.fetchall()
        allproducts = []
        
        for row in product_data:
            product = {
                "name": row[0],
                "price": row[1],
                "category": row[2],
                "subcategory": row[3],
                "description": row[4],
                "sku": row[5],
                "barcode": row[6],
                "barcode_img": f"/All_Images/{row[7]}",
                "item_img": f"/All_Images{row[8]}",
                "stock": row[9],
                "reorder_level": row[10]
            }
            allproducts.append(product)
        return allproducts
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.post("/validateSKU")
def validate_sku_and_barcode(sku: str, current_user: Annotated[str, Depends(oauth2_scheme)]):
    try:

        payload = decode_access_token(current_user)

        user_name = payload["sub"]
        role = payload["role"]
        if not user_name:
            return JSONResponse(content={"message": "User not available", "status": False}, status_code=404)

        if role not in ["super_admin", "inventory_manager"]:
            return JSONResponse(content={"message": "dont have access", "status": False}, status_code=403)

        sku_query = f"""SELECT sku FROM ItemDetails WHERE sku='{sku}'"""
        cursor.execute(sku_query)
        sku_data = cursor.fetchone()

        if sku_data is not None:
            return JSONResponse(content={"message": "sku not available", "status": False}, status_code=406)

    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    
@router.get("/productDetails")
def get_all_products(current_user: Annotated[str, Depends(oauth2_scheme)], sku: str | None=None, barcode_num: str| None=None):
    try:
        payload = decode_access_token(current_user)
        # print(payload)
        user_name = payload["sub"]
        user_role = payload["role"]
        if not user_name:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="user not found")
        if user_role not in ["super_admin", "inventory_manager", "warehouse_staff"]:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="you don't have access")
        
        if sku:
            check_sku_db = "SELECT sku FROM ItemDetails WHERE sku=%s"
            cursor.execute(check_sku_db, (sku,))
            sku_result = cursor.fetchone()

            if not sku_result:
                return JSONResponse(content={"message": "SKU not found", "status": False}, status_code=404)
            
            get_products_query = '''select item_name, item_price, category_name, subcategory_name, item_description, sku, barcode, barcode_url, item_img_url, current_stock, reorder_level, stock_value
                                    from ItemDetails
                                    inner join category on ItemDetails.item_category_id=category.category_id
                                    inner join SubCategory on ItemDetails.item_subcategory_id=SubCategory.subcategory_id
                                    inner join stock on ItemDetails.item_id=stock.item_id
                                    WHERE sku=%s'''
            
            cursor.execute(get_products_query, (sku, ))
            product_data = cursor.fetchone()
        
        if barcode_num:
            check_barcode_num = "SELECT barcode FROM ItemDetails WHERE barcode=%s"
            cursor.execute(check_barcode_num, (barcode_num,))
            barcode_result = cursor.fetchone()

            if not barcode_result:
                return JSONResponse(content={"message": "barcode not found", "status": False}, status_code=404)
            
            get_products_query = '''select item_name, item_price, category_name, subcategory_name, item_description, sku, barcode, barcode_url, item_img_url, current_stock, reorder_level, stock_value
                                    from ItemDetails
                                    inner join category on ItemDetails.item_category_id=category.category_id
                                    inner join SubCategory on ItemDetails.item_subcategory_id=SubCategory.subcategory_id
                                    inner join stock on ItemDetails.item_id=stock.item_id
                                    WHERE barcode=%s'''
            
            cursor.execute(get_products_query, (barcode_num, ))
            product_data = cursor.fetchone()

        product = {
            "name": product_data[0],
            "price": product_data[1],
            "category": product_data[2],
            "subcategory": product_data[3],
            "description": product_data[4],
            "sku": product_data[5],
            "barcode": product_data[6],
            "barcode_img": f"/All_Images/{product_data[7]}",
            "item_img": f"/All_Images/{product_data[8]}",
            "stock": product_data[9],
            "reorder_level": product_data[10]
        }
        return product

    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
