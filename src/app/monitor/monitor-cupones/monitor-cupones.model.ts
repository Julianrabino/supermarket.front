import { BonitaVentaModel } from 'src/app/bonita/bdm/venta.model';

export class ItemCuponVenta {
    public ProductId: number;
    public ProductName: string;
    public PrecioVentaAplicado: number;
    public PrecioCosto: number;
    public FechaVenta: Date;
    public PorcentajeDescuento: number;
    public NumeroCupon: number;
    public get MontoGanancia(): number { return this.PrecioVentaAplicado - this.PrecioCosto; }

    public constructor (bonitaVentaModel: BonitaVentaModel) {
        this.ProductId = bonitaVentaModel.productId;
        this.ProductName = bonitaVentaModel.productName;
        this.PrecioVentaAplicado = bonitaVentaModel.precioVentaAplicado;
        this.PrecioCosto = bonitaVentaModel.precioCosto;
        this.FechaVenta = bonitaVentaModel.fechaVenta;
        this.PorcentajeDescuento = bonitaVentaModel.porcentajeDescuentoCupon;
        this.NumeroCupon = bonitaVentaModel.nroCupon;
    }
}
