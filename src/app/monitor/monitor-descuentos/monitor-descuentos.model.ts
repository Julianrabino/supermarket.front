import { BonitaVentaModel } from 'src/app/bonita/bdm/venta.model';

export class ItemDescuentoVenta {
    public ProductId: number;
    public ProductName: string;
    public PrecioVentaAplicado: number;
    public PrecioVentaOriginal: number;
    public PrecioCosto: number;
    public FechaVenta: Date;
    public get MontoDescuento(): number { return this.PrecioVentaOriginal - this.PrecioVentaAplicado; }
    public get MontoGanancia(): number { return this.PrecioVentaAplicado - this.PrecioCosto; }

    public constructor (bonitaVentaModel: BonitaVentaModel) {
        this.ProductId = bonitaVentaModel.productId;
        this.ProductName = bonitaVentaModel.productName;
        this.PrecioVentaAplicado = bonitaVentaModel.precioVentaAplicado;
        this.PrecioVentaOriginal = bonitaVentaModel.precioVentaOriginal;
        this.PrecioCosto = bonitaVentaModel.precioCosto;
        this.FechaVenta = bonitaVentaModel.fechaVenta;
    }
}
