import Swal from "sweetalert2";

export function SessionExpiredAlert() {
  Swal.fire({
    title: "Session Expired!",
    text: "You have to login again!",
    icon: "error",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Okay!",
  }).then((result) => {
    if (result.isConfirmed) {
      return;
    }
  });
}
