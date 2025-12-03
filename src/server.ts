import { app } from './index';
import { PORT } from './config/config';



async function StartServer() {
    try {
        // await initalizeApp()
        app.listen(PORT, (e?: Error) => {
            if (e) {
                throw new Error(`Server not started: ${e?.message}`);

            }
            console.log("Server started Successfully", PORT);
        });
    } catch (e) {

        console.log('Failed to start server', e);
        process.exit(1)
    }
}

StartServer();