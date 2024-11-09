import swal2 from "sweetalert2";

const alerta = {}

alerta.toast = function (mensaje, tipo) {
    return swal2.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: tipo,
        title: mensaje,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", swal2.stopTimer);
            toast.addEventListener("mouseleave", swal2.resumeTimer);
    }})
}

export default alerta