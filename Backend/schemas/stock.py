from pydantic import BaseModel

class Update_inventory(BaseModel):
    sku: str
    stock: int | None=None
    reorder_level: int | None=None
    stock_type: str
