package server

import (
	"log"
	"net"

	"orm/ormpb"

	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

type Server struct {
	s *grpc.Server
}

type UserBoilerOrm struct {
	ormpb.UserServiceServer
}

func New(useReflection bool) *Server {
	s := grpc.NewServer()
	ormpb.RegisterUserServiceServer(s, &UserBoilerOrm{})
	//ormpb.RegisterBoilerServer(s, &BoilerOrm{})

	if !useReflection {
		reflection.Register(s)
		log.Println("gRPC reflection enabled")
	}

	return &Server{
		s: s,
	}
}

func GetServer() *Server {
	return &Server{}
}

func (s *Server) Serve(l net.Listener) *Server {
	log.Println("works as a gRPC server")
	go func() {
		if err := s.s.Serve(l); err != nil {
			log.Println(err)
		}
	}()
	return s
}

func (s *Server) Stop() error {
	s.s.GracefulStop()
	return nil
}
