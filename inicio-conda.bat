call C:/ProgramData/Anaconda3/Scripts/activate.bat C:\ProgramData\Anaconda3 
call conda activate opencheck
call cd C:\Opencheck\OpenCheck_restapi
call set FLASK_APP = app.py
call set FLASK_DEBUG = 1
call flask run