<?php
session_start();
require_once 'C:\xampp\htdocs\Project\public\config\db.php';

if (isset($_POST['signin'])) {

    $email = $_POST['email'];
    $password = $_POST['password'];


    if (empty($email) || empty($password)) {
        $_SESSION['error'] = 'Please provide both email and password';
        header("location: signin.php");
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $_SESSION['error'] = 'The email format is incorrect';
        header("location: signin.php");
        exit;
    }

    try {
        $check_data = $conn->prepare("SELECT * FROM users WHERE email = :email");
        $check_data->bindParam(":email", $email);
        $check_data->execute();
        $row = $check_data->fetch(PDO::FETCH_ASSOC);

        if ($check_data->rowCount() > 0) {
            if ($email == $row["email"]) {
                if (password_verify($password, $row["password"])) {
                    switch ($row['urole']) {
                        case 'admin':
                            $_SESSION['admin_login'] = $row['id'];
                            header('location: /Project/lander/dashboard_lander.html');
                            exit;
                        case 'staff':
                            $_SESSION['staff_login'] = $row['id'];
                            header('location: /Project/starff/Staff_home.html');
                            exit;
                        default:
                            $_SESSION['user_login'] = $row['id'];
                            header('location: signin.php');
                            header('location: /Project/User/HomeUser.html');
                            exit;
                    }
                } else {
                    $_SESSION['error'] = 'Wrong password!';
                    header('location: signin.php');
                    
                }
            }
        } else {
            $_SESSION['error'] = 'No user found with this email!';
            header('location: signin.php');
            
        }
    } catch (PDOException $e) {
        echo $e->getMessage();
    }
}
?>