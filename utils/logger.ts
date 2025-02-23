interface LoggerOptions {
  showInProd?: boolean;
  includeTimestamp?: boolean;
}

class Logger {
  private showInProd: boolean;
  private includeTimestamp: boolean;
  private env: {
    isDevelopment: boolean;
    isNode: boolean;
  };

  constructor(options: LoggerOptions = {}) {
    this.showInProd = options.showInProd ?? false;
    this.includeTimestamp = options.includeTimestamp ?? true;
    this.env = this.getEnvironment();
  }

  private getEnvironment() {
    const isNode =
      typeof process !== "undefined" &&
      process.versions != null &&
      process.versions.node != null;

    let isDevelopment = true;

    if (isNode) {
      isDevelopment = process.env.NODE_ENV !== "production";
    } else {
      isDevelopment =
        !window.location.hostname.includes("production") &&
        process.env.NODE_ENV !== "production";
    }

    return { isDevelopment, isNode };
  }

  private getCallerInfo() {
    const callerInfo = { file: "unknown", line: "unknown", column: "unknown" };

    try {
      const stack = new Error().stack;
      if (stack) {
        // Split the stack trace into lines
        const lines = stack.split("\n");

        // Find the first line that doesn't include our logger file
        let callerLine = "";
        for (let i = 1; i < lines.length; i++) {
          if (
            !lines[i].includes("debugLogger.ts") &&
            !lines[i].includes("at Logger.")
          ) {
            callerLine = lines[i];
            break;
          }
        }

        if (this.env.isNode) {
          // Node.js style stack trace
          const matches = callerLine?.match(/\((.*):(\d+):(\d+)\)$/);
          if (matches) {
            callerInfo.file = matches[1]?.split("/").pop() || "unknown";
            callerInfo.line = matches[2] || "unknown";
            callerInfo.column = matches[3] || "unknown";
          }
        } else {
          // Browser style stack trace
          const matches = callerLine?.match(/at (?:.*? \()?(.+):(\d+):(\d+)/);
          if (matches) {
            callerInfo.file = matches[1]?.split("/").pop() || "unknown";
            callerInfo.line = matches[2] || "unknown";
            callerInfo.column = matches[3] || "unknown";
          }
        }
      }
    } catch {
      // If stack trace parsing fails, we'll use default unknown values
    }

    return callerInfo;
  }

  private formatMetadata(level: string) {
    const callerInfo = this.getCallerInfo();
    const timestamp = this.includeTimestamp ? new Date().toISOString() : "";

    return [
      `[${level.toUpperCase()}]`,
      this.includeTimestamp ? `[${timestamp}]` : "",
      `[${callerInfo.file}:${callerInfo.line}]`,
    ].filter(Boolean);
  }

  private formatArgument(arg: unknown): string {
    if (typeof arg === "object") {
      return JSON.stringify(arg, null, 2);
    }
    return String(arg);
  }

  private _log(
    level: "debug" | "info" | "warn" | "error" | "log",
    ...args: unknown[]
  ) {
    // Check if we should show logs in current environment
    if (!this.env.isDevelopment && !this.showInProd) {
      return;
    }

    const metadata = this.formatMetadata(level);

    // Browser-specific styling
    if (!this.env.isNode) {
      const styles = {
        log: "color: #0099cc",
        debug: "color: #0099cc",
        info: "color: #00cc00",
        warn: "color: #cccc00",
        error: "color: #cc0000",
      };

      const formattedArgs = args.map((arg) => this.formatArgument(arg));
      console[level](
        `%c${[...metadata, ...formattedArgs].join(" ")}`,
        styles[level],
      );
      return;
    }

    // Node.js output with colors
    const colors = {
      log: "\x1b[36m", // Cyan
      debug: "\x1b[36m", // Cyan
      info: "\x1b[32m", // Green
      warn: "\x1b[33m", // Yellow
      error: "\x1b[31m", // Red
      reset: "\x1b[0m", // Reset
    };

    const formattedArgs = args.map((arg) => this.formatArgument(arg));
    console[level](colors[level], ...metadata, ...formattedArgs, colors.reset);
  }

  log(...args: unknown[]) {
    this._log("log", ...args);
  }

  debug(...args: unknown[]) {
    this._log("debug", ...args);
  }

  info(...args: unknown[]) {
    this._log("info", ...args);
  }

  warn(...args: unknown[]) {
    this._log("warn", ...args);
  }

  error(...args: unknown[]) {
    this._log("error", ...args);
  }
}

// Create default instance
const logger = new Logger();

export { Logger, logger };
