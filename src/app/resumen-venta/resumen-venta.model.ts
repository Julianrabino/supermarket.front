export class Venta {
    public get MontoTotal(): number {
        let result = 0;
        this.Items.forEach(itemVenta => {
            result += itemVenta.MontoTotal;
        });
        return result;
    }
    public VentaId: string;
    public Items: ItemVenta[];

    constructor() {
        this.Items = [];
    }

    public agregarVenta(itemVenta: ItemVenta) {
        const itemEqualIndex = this.Items.findIndex(i => i.equals(itemVenta));
        if (itemEqualIndex === -1) {
            this.Items.push(itemVenta);
        } else {
            this.Items[itemEqualIndex].Cantidad += itemVenta.Cantidad;
        }
    }
}

export class ItemVenta {
    public ProductId: number;
    public ProductName: string;
    public PrecioVentaAplicado: number;
    public PrecioVentaOriginal: number;
    public NroCupon?: number;
    public CuponValido?: boolean;
    public VentaExitosa: boolean;
    public Cantidad: number;
    public get MontoTotal(): number { return this.Cantidad * this.PrecioVentaAplicado; }

    public equals(itemVenta: ItemVenta) {
        return this.ProductId === itemVenta.ProductId &&
            this.PrecioVentaAplicado === itemVenta.PrecioVentaAplicado &&
            this.PrecioVentaOriginal === itemVenta.PrecioVentaOriginal &&
            (this.NroCupon === itemVenta.NroCupon || (this.NroCupon == null && itemVenta.NroCupon == null)) &&
            (this.CuponValido === itemVenta.CuponValido || (this.CuponValido == null && itemVenta.CuponValido == null)) &&
            this.VentaExitosa === itemVenta.VentaExitosa;
    }
}
