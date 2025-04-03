# Prueba tecnica - manejador de tareas

## Deberas a partir de este repositorio crear uno nuevo, subirlo a tu propio github y enviar el enlace del repositorio ( publico ) mediante linkedin a la persona que te contacto.

## Bug 1: Problema de referencia en contexto

El sistema de autenticación parece funcionar correctamente al iniciar sesión, pero al recargar la página, la sesión no se mantiene a pesar de usar localStorage. Investiga el AuthContext y cómo se está gestionando la persistencia de la autenticación.

## Bug 2: Formulario de Login incompleto

El formulario de login permite enviar datos sin validación. Implementa una validación que impida el envío del formulario cuando los campos están vacíos y muestra un mensaje de error apropiado.

## Bug 3: Problema con el marcado de tareas

Cuando intentas marcar una tarea como completada, el cambio no sucede correctamente. Investiga la función que se dispara en ese evento para solucionar el problema.
