import { Producto } from '../productos/producto.model';

export class Cupon {
    public Numero: number;
}

export class CompraProducto {
    public Producto: Producto;
    public Cantidad: number;
    public Cupones: number[];

    public constructor() {
        this.Cupones = [];
        this.Cantidad = 0;
    }
}

export class CarritoCompra {
    public Productos: CompraProducto[];

    public constructor() {
        this.Productos = [];
    }
}
