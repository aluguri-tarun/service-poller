package se.kry.codetest.migrate;

import io.vertx.core.Vertx;
import se.kry.codetest.DBConnector;

public class DBMigration {

    public static void main(String[] args) {
        Vertx vertx = Vertx.vertx();
        DBConnector connector = new DBConnector(vertx);
        connector.query("CREATE TABLE IF NOT EXISTS service ("
                + "url VARCHAR(128) NOT NULL PRIMARY KEY,"
                + "name VARCHAR(128),"
                + "timestamp TIMESTAMP"
                + ")").setHandler(done -> {
            System.out.println("in mig");
            if (done.succeeded()) {
                System.out.println("completed db migrations");
//          System.out.println("in mig suc");
            } else {
                done.cause().printStackTrace();
//          System.out.println("in mig fail");
            }
            vertx.close(shutdown -> {
                System.exit(0);
            });
        });
    }
}
