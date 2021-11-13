export namespace µChangeAddressModal {
  export interface Props {
    isOpen: boolean
    onClose: () => void
    updateUser: any
    id: string
  }

  export interface Methods {
    onUpdate: () => void
  }
}
