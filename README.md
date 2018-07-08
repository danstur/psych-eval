# Psych Evaluation 

Basic angular application to get a list of possible illnesses based on specified symptoms.


## Data structures

Data to consider:

- List of illnesses: large number, but don't really have to access it randomly
- Illness: small number of symptoms, can be a simple list
- Available symptoms: large number but again no random access necessary
- Selected symptoms: comparisons to illness symptoms. Both very small 


Can get away with arrays everywhere, set is rather cumbersome to use in Javascript and doesn't offer noticable performance benefits.

## TODOs

- Basic dotnet application to host angular app.
- Base service that handles base URL.
- Extra page that shows more information about illness on click? Important to allow to go back/forward without losing data!!
