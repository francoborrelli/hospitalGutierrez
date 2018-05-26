import { Modal } from "antd"

const confirmationModal = (content, onOk) =>
  Modal.confirm({
    title: "¿Estás Seguro?",
    okText: "Confirmar",
    cancelText: "Cancelar",
    content: content,
    maskClosable: true,
    onOk: onOk
  })

const deleteModal = (type, record, onOk, action) => {
  const content =
    "Estas a punto de " + (action || "eliminar")  + " al " +
    type +
    " " +
    record.name +
    " " +
    record.lastname +
    "."
  return confirmationModal(content, onOk)
}

export { confirmationModal, deleteModal }
