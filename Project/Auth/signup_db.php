<?php
session_start();
require_once 'C:\xampp\htdocs\Project\public\config\db.php';

if (isset($_POST['signup'])) {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $c_password = $_POST['c_password'];
    $urole = 'user';

    if (empty($username)) {
        $_SESSION['error'] = 'Please type your name';
        header("location: signup.php");
    } else if (empty($email)) {
        $_SESSION['error'] = 'Please type your email';
        header("location: signup.php");
    } else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $_SESSION['error'] = 'The email format is incorrect';
        header("location: signup.php");
    } else if (empty($password)) {
        $_SESSION['error'] = 'Please type your password';
        header("location: signup.php");
    } else if (strlen($_POST['password']) > 20 || strlen($_POST['password']) < 6) {
        $_SESSION['error'] = 'Password must be between 6 to 20 in length';
        header("location: signup.php");
    } else if (empty($c_password)) {
        $_SESSION['error'] = 'Please confirm your password';
        header("location: signup.php");
    } else if ($c_password != $password) {
        $_SESSION['error'] = "Passwords don't match";
        header("location: signup.php");
    } else {
        try {
            $check_email = $conn->prepare("SELECT email FROM users WHERE email = :email");
            $check_email->bindParam(":email", $email);
            $check_email->execute();
            $row = $check_email->fetch(PDO::FETCH_ASSOC);

            if ($row === false) {
                $passwordHash = password_hash($password, PASSWORD_DEFAULT);
                $stmt = $conn->prepare("INSERT INTO users(username, email, password, urole) VALUES(:username, :email, :password, :urole)");
                $stmt->bindParam(":username", $username);
                $stmt->bindParam(":email", $email);
                $stmt->bindParam(":password", $passwordHash);
                $stmt->bindParam(":urole", $urole);
                $stmt->execute();
                $_SESSION['success'] = 'You have successfully applied for membership <a href="signin.php" class="alert-link">Signin</a>';
                header('location: signup.php');
            } else {
                $_SESSION['warning'] = 'This email is already in the system <a href="signin.php">Signin</a>';
                header("location: signup.php");
            }
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
}
?>
