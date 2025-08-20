import fs from 'fs';
import path from 'path';

// Determine the root directory of the solar-system project
const projectRoot = path.resolve(process.cwd());
const logDirectory = path.join(projectRoot, 'logs');

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

const universeLogPath = path.join(logDirectory, 'universe.log');
const debugUniverseLogPath = path.join(logDirectory, 'debug-universe.log');

// Ensure log files exist
fs.writeFileSync(universeLogPath, '', { flag: 'a' });
fs.writeFileSync(debugUniverseLogPath, '', { flag: 'a' });

// Log the debugging journey as the first entry
fs.appendFileSync(debugUniverseLogPath, `[${new Date().toISOString()}] Initializing Cosmic Guardian. Debugging module compatibility issues. Root cause identified: CommonJS vs. ESM conflict in logger. Solution: Rewriting logger to use pure ES Module syntax.\n`);


interface LogEntry {
  timestamp: string;
  [key: string]: any;
}

class UniverseLogger {
  private universeLogStream: fs.WriteStream;
  private debugUniverseLogStream: fs.WriteStream;

  constructor() {
    this.universeLogStream = fs.createWriteStream(universeLogPath, { flags: 'a' });
    this.debugUniverseLogStream = fs.createWriteStream(debugUniverseLogPath, { flags: 'a' });

    this.startPeriodicLogging();
  }

  private log(stream: fs.WriteStream, data: object) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      ...data,
    };
    stream.write(JSON.stringify(entry) + '\n');
  }

  public logUniverse(data: object) {
    this.log(this.universeLogStream, data);
  }

  public logDebug(data: object) {
    this.log(this.debugUniverseLogStream, data);
  }

  private startPeriodicLogging() {
    setInterval(() => {
      const memoryUsage = process.memoryUsage();
      this.logUniverse({ type: 'health_check', memory: memoryUsage });
    }, 100);
  }
}

// Singleton instance
const loggerInstance = new UniverseLogger();

export default loggerInstance;