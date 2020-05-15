request uri
    - check if it's an uuid
    - search for this uuid in db
    - get the corresponding location
    - check if it's a file =>get the relative dir and use streams to write out
    - check it it's a folder => send the cache if exits with that uuid otherwise cache the response

v8 profiling 
node --prof --no-logfile-per-isolate --log --logfile=file.log bin.js
node --prof-process file.log >file.txt