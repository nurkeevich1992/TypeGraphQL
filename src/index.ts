import "reflect-metadata";
import app from "./app";

const main = async () => {
    const application = await app();

    application.listen(4000, () => {
        console.log("server started on: http://localhost:4000/graphql");
    });
};

main();
