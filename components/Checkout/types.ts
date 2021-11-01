import { FormEventHandler } from "react"

export namespace µCheckoutForm {
  export type HandleSubmit = FormEventHandler<HTMLDivElement> &
    FormEventHandler<HTMLFormElement>
}
