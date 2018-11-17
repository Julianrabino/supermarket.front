export class MensajeUi {
    public Texto: string;
    public RefId: any;
    public Tipo: MensajeUiType;

    public constructor(texto: string, refId: any, tipo: MensajeUiType) {
        this.Texto = texto;
        this.RefId = refId;
        this.Tipo = tipo;
    }
}

export declare type MensajeUiType = 'error' | 'info';
