package main

import (
	"flag"
	"fmt"
	"log"
	"net"
	"os"
	"os/signal"

	"database/sql"
	"orm/server"

	_ "github.com/lib/pq" // must import
	"github.com/volatiletech/sqlboiler/boil"
)

func main() {
	// if we crash the go code, we get the file name and line number
	log.SetFlags(log.LstdFlags | log.Lshortfile)

	isReflection := flag.Bool("r", false, "use gRPC reflection")
	flag.Parse()

	var lis net.Listener
	var err error
	lis, err = net.Listen("tcp", "127.0.0.1:50051")
	dieIf(err)

	fmt.Println("Starting Server...")
	s := server.New(*isReflection).Serve(lis)

	//initialize db connection and sqlboiler orm
	db, err := sql.Open("postgres", `host=192.168.99.100 port=5432 dbname=docker user=docker password=docker sslmode=disable`)
	dieIf(err)
	err = db.Ping()
	dieIf(err)
	boil.SetDB(db)
	boil.DebugMode = true
	fmt.Println("connected to database...")

	// Wait for Control C to exit
	ch := make(chan os.Signal, 1)
	signal.Notify(ch, os.Interrupt)

	// Block until a signal is received
	<-ch
	fmt.Println("Stopping the database")
	db.Close()
	fmt.Println("Stopping the server")
	s.Stop()
	fmt.Println("Closing the listener")
	lis.Close()
	fmt.Println("End of Program")
}

func dieIf(err error) {
	if err != nil {
		panic(err)
	}
}
