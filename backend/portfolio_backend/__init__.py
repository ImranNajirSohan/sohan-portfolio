"""
portfolio_backend/__init__.py
=============================
Initializes the Django project and registers PyMySQL as the MySQLdb driver.
This allows Django to communicate with MySQL natively on Windows without C++ compiler binaries.
"""

import pymysql

pymysql.install_as_MySQLdb()
