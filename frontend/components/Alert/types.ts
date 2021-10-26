export namespace µMisc {
  export enum AlertStatus {
    ERROR = "error",
    INFO = "info",
    WARNING = "warning",
    SUCCESS = "success"
  }
}

export namespace µAlert {
  export interface Props {
    message: string
    status?: µMisc.AlertStatus
  }
}
