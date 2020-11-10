'use strict'

class Logger {
    _throw(error, line) { // Throw an error
      error.lineNumber = line
      throw error
    }

    _log(e) { // Make a log and send to logger
      let log = {
        code: e.code,
        name: e.name,
        message: e.message,
        lineNumber: e.lineNumber,
        fileName: e.fileName,
        custom: e.custom,
        method: e.method
      }

      this._logToConsole(log) // Sending
    }

    _logToConsole(log) {
      if (log.custom === true) {
        this._showLog(log) // You haven't much time, do it!
      } else {
        log.code = '000' // Reset code
        log.method = console.error // Reset method
        this._showLog(log) // Show log
      }
    }

    _showLog(log) { // Write log to the console
      log.method(`Code: ` + log.code + `\n Name: ` + log.name + `\n Message: ` + log.message + `\n Line: ` + log.lineNumber + `\n File: ` + log.fileName)
    }
}
