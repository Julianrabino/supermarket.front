export class BonitaVentaModel {
    persistenceId: number;
    ventaId: string;
    productId: number;
    productName: string;
    nroDocumentoCliente: number;
    precioVentaAplicado: number;
    precioVentaOriginal: number;
    precioCosto: number;
    nroCupon: number;
    cuponValido: boolean;
    ventaExitosa: boolean;
    porcentajeDescuentoCupon: number;
    fechaVenta: Date;
}
