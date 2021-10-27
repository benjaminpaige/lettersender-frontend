import { AlertProps } from "@chakra-ui/react";

export namespace µMisc {
  export enum AlertStatus {
    ERROR = "error",
    INFO = "info",
    WARNING = "warning",
    SUCCESS = "success"
  }
}

export namespace µAlert {
  export interface Props extends AlertProps {
    message: string
    status?: µMisc.AlertStatus
  }
}
