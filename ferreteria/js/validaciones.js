/* ==========================================================
   validaciones.js
   Contiene:
   1) Interacción simple de los botones "Agregar al carro"
   2) Validación completa del formulario de contacto
   ========================================================== */

// ---------- 1) BOTONES "AGREGAR AL CARRO" ----------
document.querySelectorAll(".btn-agregar").forEach((boton) => {
  boton.addEventListener("click", () => {
    const nombreProducto = boton.closest(".producto-card").querySelector("h3").textContent;
    alert(`"${nombreProducto}" fue agregado al carro.`);
  });
});

// ---------- 2) VALIDACIÓN DEL FORMULARIO DE CONTACTO ----------
const form = document.getElementById("form-contacto");

if (form) {
  const campos = {
    nombre: document.getElementById("nombre"),
    rut: document.getElementById("rut"),
    correo: document.getElementById("correo"),
    telefono: document.getElementById("telefono"),
    comuna: document.getElementById("comuna"),
    mensaje: document.getElementById("mensaje"),
  };

  const mensajeExito = document.getElementById("mensaje-exito");

  // --- Validador de RUT chileno (módulo 11) ---
  function validarRut(rutCompleto) {
    // Limpia puntos y espacios, deja el guión
    const rutLimpio = rutCompleto.replace(/\./g, "").replace(/\s/g, "").toUpperCase();

    // Formato esperado: 1234567-8  (7 u 8 dígitos + guión + DV)
    const formatoValido = /^\d{7,8}-[0-9K]$/.test(rutLimpio);
    if (!formatoValido) return false;

    const [cuerpo, dv] = rutLimpio.split("-");

    let suma = 0;
    let multiplicador = 2;

    // Recorremos el cuerpo del RUT de derecha a izquierda
    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpo[i], 10) * multiplicador;
      multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }

    const resto = 11 - (suma % 11);
    let dvEsperado;
    if (resto === 11) dvEsperado = "0";
    else if (resto === 10) dvEsperado = "K";
    else dvEsperado = String(resto);

    return dvEsperado === dv;
  }

  // --- Reglas de validación por campo ---
  const reglas = {
    nombre: (valor) => {
      if (valor.trim() === "") return "El nombre es obligatorio.";
      if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,60}$/.test(valor.trim()))
        return "Ingresa solo letras (mínimo 3 caracteres).";
      return "";
    },
    rut: (valor) => {
      if (valor.trim() === "") return "El RUT es obligatorio.";
      if (!validarRut(valor.trim())) return "El RUT ingresado no es válido. Ej: 12.345.678-9";
      return "";
    },
    correo: (valor) => {
      if (valor.trim() === "") return "El correo es obligatorio.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim()))
        return "Ingresa un correo válido. Ej: nombre@dominio.cl";
      return "";
    },
    telefono: (valor) => {
      if (valor.trim() === "") return "El teléfono es obligatorio.";
      if (!/^(\+?56)?\s?9\s?\d{4}\s?\d{4}$/.test(valor.trim()))
        return "Ingresa un teléfono válido. Ej: +56 9 1234 5678";
      return "";
    },
    comuna: (valor) => {
      if (valor.trim() === "") return "La comuna es obligatoria.";
      return "";
    },
    mensaje: (valor) => {
      if (valor.trim() === "") return "El mensaje es obligatorio.";
      if (valor.trim().length < 10) return "Cuéntanos un poco más (mínimo 10 caracteres).";
      return "";
    },
  };

  // --- Muestra u oculta el error de un campo puntual ---
  function validarCampo(nombreCampo) {
    const input = campos[nombreCampo];
    const spanError = document.getElementById(`error-${nombreCampo}`);
    const mensajeError = reglas[nombreCampo](input.value);

    if (mensajeError) {
      spanError.textContent = mensajeError;
      input.classList.add("campo-invalido");
      input.setAttribute("aria-invalid", "true");
    } else {
      spanError.textContent = "";
      input.classList.remove("campo-invalido");
      input.setAttribute("aria-invalid", "false");
    }

    return mensajeError === "";
  }

  // Valida en tiempo real (al salir del campo)
  Object.keys(campos).forEach((nombreCampo) => {
    campos[nombreCampo].addEventListener("blur", () => validarCampo(nombreCampo));
  });

  // Formatea el RUT automáticamente mientras el usuario escribe (opcional, mejora UX)
  campos.rut.addEventListener("input", () => {
    let valor = campos.rut.value.replace(/[^0-9kK]/g, "");
    if (valor.length > 1) {
      const cuerpo = valor.slice(0, -1);
      const dv = valor.slice(-1).toUpperCase();
      campos.rut.value = `${cuerpo}-${dv}`;
    }
  });

  // Validación al enviar el formulario
  form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    let formularioValido = true;
    Object.keys(campos).forEach((nombreCampo) => {
      const valido = validarCampo(nombreCampo);
      if (!valido) formularioValido = false;
    });

    if (formularioValido) {
      mensajeExito.textContent = "¡Gracias! Tu mensaje fue enviado correctamente.";
      form.reset();
    } else {
      mensajeExito.textContent = "";
      // Lleva el foco al primer campo con error para accesibilidad
      const primerCampoInvalido = form.querySelector(".campo-invalido");
      if (primerCampoInvalido) primerCampoInvalido.focus();
    }
  });
}
