package server

import (
	"context"
	"encoding/json"
	"fmt"
	"strconv"

	"github.com/thedevsaddam/gojsonq"
	"github.com/volatiletech/sqlboiler/boil"
	. "github.com/volatiletech/sqlboiler/queries/qm"

	"golang.org/x/crypto/bcrypt"

	"orm/models"
	"orm/ormpb"
)

const BcryptCost = 12

func (s *UserBoilerOrm) ById(ctx context.Context, req *ormpb.UserId) (*ormpb.UserResponse, error) {
	fmt.Printf("UserId function was invoked with %v\n", req)

	id := req.GetId()

	output, err := models.Users(Where("id = ?", id), OrderBy("id asc")).OneG(context.Background())
	if err != nil {
		fmt.Printf("There is no entity with id %v\n", id)
		return nil, err
	}

	result, err := json.Marshal(output)

	if err != nil {
		fmt.Printf("error when marshal database call  %+v\n", err)
		return nil, err
	}
	res := &ormpb.UserResponse{
		Result: string(result),
	}
	return res, nil
}

func (s *UserBoilerOrm) List(ctx context.Context, req *ormpb.UserList) (*ormpb.UserResponse, error) {
	fmt.Printf("UserList function was invoked with %v\n", req)

	limit := req.GetLimit()

	offset := req.GetOffset()

	output, err := models.Users(Limit(int(limit)), Offset(int(offset))).AllG(context.Background())
	if err != nil {
		res := &ormpb.UserResponse{
			Result: "",
		}
		return res, nil
	}

	result, err := json.Marshal(output)

	if err != nil {
		fmt.Errorf("error when marshal database call  %+v", err)
		return nil, err
	}
	res := &ormpb.UserResponse{
		Result: string(result),
	}
	return res, nil
}

func (s *UserBoilerOrm) Create(ctx context.Context, req *ormpb.UserCreate) (*ormpb.UserResponse, error) {
	fmt.Printf("UserCreate function was invoked with %v\n", req)

	jsonStr := req.GetData()

	var user models.User

	profile := gojsonq.New().JSONString(jsonStr).Find("profile")
	fmt.Printf("profile equals %v\n", profile)
	if profile != nil {
		profile_json, _ := json.Marshal(profile)
		user.Profile = profile_json
	}

	role := gojsonq.New().JSONString(jsonStr).Find("role")

	if role != nil {
		user.Role = hashPassword(role.(string))
	}

	password := gojsonq.New().JSONString(jsonStr).Find("password")

	fmt.Printf("pass equals %v\n", password)

	if password != nil {
		user.Password = hashPassword(password.(string))
	} else {
		panic("password cannot be empty")
	}

	user.Name = gojsonq.New().JSONString(jsonStr).Find("name").(string)
	user.Email = gojsonq.New().JSONString(jsonStr).Find("email").(string)

	err := user.InsertG(context.Background(), boil.Infer())

	if err != nil {
		fmt.Printf("error when database call  %+v", err)
		return nil, err
	}

	res := &ormpb.UserResponse{
		Result: strconv.Itoa(user.ID),
	}
	return res, nil
}

func (s *UserBoilerOrm) Update(ctx context.Context, req *ormpb.UserUpdate) (*ormpb.UserResponse, error) {
	fmt.Printf("UserUpdate function was invoked with %v\n", req)

	jsonStr := req.GetData()
	id := req.GetId()

	user, err := models.Users(Where("id = ?", id), OrderBy("id asc")).OneG(context.Background())
	if err != nil {
		fmt.Printf("user not found in function UserUpdate  %+v", err)
		return nil, err
	}

	profile := gojsonq.New().JSONString(jsonStr).Find("profile")
	fmt.Printf("profile equals %v\n", profile)
	if profile != nil {
		profile_json, _ := json.Marshal(profile)
		user.Profile = profile_json
	}

	password := gojsonq.New().JSONString(jsonStr).Find("password")

	fmt.Printf("pass equals %v\n", password)

	if password != nil {
		user.Password = hashPassword(password.(string))
	}

	role := gojsonq.New().JSONString(jsonStr).Find("role")

	if role != nil {
		user.Role = hashPassword(role.(string))
	}

	user.Name = gojsonq.New().JSONString(jsonStr).Find("name").(string)
	user.Email = gojsonq.New().JSONString(jsonStr).Find("email").(string)

	rowsAff, err := user.UpdateG(context.Background(), boil.Infer())

	if err != nil {
		fmt.Errorf("error when updating user  %+v", err)
		return nil, err
	}

	result, err := json.Marshal(rowsAff)

	if err != nil {
		fmt.Errorf("error when marshal database call  %+v", err)
		return nil, err
	}

	res := &ormpb.UserResponse{
		Result: string(result),
	}
	return res, nil
}

func (s *UserBoilerOrm) Del(ctx context.Context, req *ormpb.UserDelete) (*ormpb.UserResponse, error) {
	fmt.Printf("UserDelete function was invoked with %v\n", req)

	id := req.GetId()

	output, err := models.Users(Where("id = ?", id), OrderBy("id asc")).OneG(context.Background())
	if err != nil {
		fmt.Printf("user not found in function UserDelete  %+v", err)
		return nil, err
	}
	rowsAff, err := output.DeleteG(context.Background())
	if err != nil {
		fmt.Printf("error when deleting user from database  %+v", err)
		return nil, err
	}

	result, err := json.Marshal(rowsAff)

	if err != nil {
		fmt.Errorf("error when marshal database call  %+v", err)
		return nil, err
	}
	res := &ormpb.UserResponse{
		Result: string(result),
	}
	return res, nil
}

func hashPassword(password string) string {

	hashedPassword, er := bcrypt.GenerateFromPassword([]byte(password), BcryptCost)
	if er != nil {
		panic("error when hashing password")
	}
	return string(hashedPassword)
}
