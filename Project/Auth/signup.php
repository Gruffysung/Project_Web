<?php
session_start();
require_once 'C:\xampp\htdocs\Project\public\config\db.php';
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MFU RIDE</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
</head>

<body>
    <!-- Section: Design Block -->
    <section class="text-center text-lg-start">
        <style>
            .col-lg-4 {
                background-color: gainsboro;
                height: 800px;
            }

            .col-lg-8 {
                background-color: rgb(77, 13, 104);
                height: 800px;
            }

            .form-outline {
                display: block;
            }

            #re {
                margin-left: 280px;
            }

            #email1 {
                margin-top: 200px;
                width: 1500px;
            }

            #mfuride {
                text-align: center;
                margin-top: 10px;
            }

            .col-1 {
                margin-top: 200px;
                margin-left: 145px;
            }

            #box {
                margin-left: 50px;
            }

            #gender1 {
                width: 140px;
                margin-left: 100px;
            }

            #date1 {
                width: 200px;
                margin-left: 100px;
            }
        </style>
        <div class="card mb-3">
            <div class="row d-flex">
                <div class="col-lg-4">
                    <div class="col-1">
                        <i style="font-size:170px " class="fas fa-motorcycle"></i>
                    </div>
                    <h1 id="mfuride">MFU RIDE</h1>
                </div>
                <div class="col-lg-8">
                    <form action="signup_db.php" method="post">
                        <div class="card-body py-5 px-md-5">
                            <div id="email1">
                                <?php if (isset($_SESSION['error'])) { ?>
                                    <div class="alert alert-danger w-50 mx-5 mb-3" role="alert">
                                        <?php
                                        echo $_SESSION['error'];
                                        unset($_SESSION['error']);
                                        ?>
                                    </div>
                                <?php } ?>
                                <?php if (isset($_SESSION['warning'])) { ?>
                                    <div class="alert alert-warning w-50 mx-5 mb-3" role="alert">
                                        <?php
                                        echo $_SESSION['warning'];
                                        unset($_SESSION['warning']);
                                        ?>
                                    </div>
                                <?php } ?>
                                <?php if (isset($_SESSION['success'])) { ?>
                                    <div class="alert alert-success w-50 mx-5 mb-3" role="alert">
                                        <?php
                                        echo $_SESSION['success'];
                                        unset($_SESSION['success']);
                                        ?>
                                    </div>
                                <?php } ?>
                                <input type="text" placeholder="Username" id="username" name="username"
                                    class="form-control w-50 mx-5 mb-3">
                                <input type="email" placeholder="E-mail" id="email" name="email"
                                    class="form-control w-50 mx-5 mb-3">
                                <input type="password" placeholder="Password" id="password" name="password"
                                    class="form-control w-50 mx-5 mb-3">
                                <input type="password" placeholder="Confirm Password" id="password1" name="c_password"
                                    class="form-control w-50 mx-5 mb-3">
                            </div>
                            <div id="box" class="form-check mb-5 ">
                                <label class="form-check-label text-white">
                                    <input class="form-check-input " type="checkbox" name="remember"> Do you confirm to
                                    register?
                                </label>
                            </div>
                            <div class="text-center mt-3">
                                <button type="submit" id="btn" name="signup" class="btn btn-warning ">Sign up</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
    <script>
        const signupBtn = document.querySelector('#btn');
    </script>
</body>

</html>