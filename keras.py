import sys, json, numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

def write_in(train_model, x_test, y_test):
    test_dataset = tf.data.Dataset.from_tensor_slices((x_test, y_test))
    test_dataset = test_dataset.batch(64)
    results = train_model.evaluate(test_dataset)
    return results

def main(train_model, x_test, y_test):
    accuracy_results = write_in(train_model, x_test, y_test)
    return accuracy_results
    
if __name__ == '__main__':
    main(sys.argv[0],sys.argv[1],sys.argv[2])