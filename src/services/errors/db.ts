export class CustomGeneralError extends Error {
  message = 'Ocurrio un error inesperado'

  constructor(message?: string) {
    super(message)
  }
}

export class ResourceAlreadyExists extends Error {
  message = 'El recurso ya existe'

  constructor(message?: string) {
    super(message)
  }
}

export class ResourceNotFound extends Error {
  message = 'El recurso no fue encontrado'

  constructor(message?: string) {
    super(message)
  }
}

export class EmptyResponseError extends Error {
  message = 'No se encontraron resultados'

  constructor(message?: string) {
    super(message)
  }
}

export class NotConnected extends Error {
  message = 'No está conectado a la base de datos local'

  constructor(message?: string) {
    super(message)
  }
}

export class AlreadyConnected extends Error {
  message = 'Ya está conectado a la base de datos local'

  constructor(message?: string) {
    super(message)
  }
}
