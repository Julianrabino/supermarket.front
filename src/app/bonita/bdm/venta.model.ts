export class BonitaVentaModel {
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
}
