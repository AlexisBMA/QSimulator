# Pseudo Random Number Simulator
![GitHub top language](https://img.shields.io/github/languages/top/AlexisBMA/QSimulator)
![Lines of code](https://tokei.rs/b1/github/AlexisBMA/QSimulator?category=code)

### Simulation:
We wanted to be able to compare between several Queueing System Models. 
Supported Queue Models (in Kendall notation) are:

1. M / M / 1
2.  M / M / s
3.  M / M / s / k
4.  M / G / 1
5.  M / D / 1
6.  M / E_k / 1


### Cost Computation:
We implemented a module to compute the cost of a given Queueing System, provided the Service Cost (Cs) and Waiting Cost (Cw).

### Export your results to CSV!
When you're finished you can both export your sample to a csv file for further analysis as well as the generated table for both validation tests. These will be downloaded as `chi_test.csv` or `kol_test.csv` respectively.
