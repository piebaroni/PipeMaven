import pandas as pd
from scipy.stats import entropy
from sklearn.model_selection import train_test_split
from sklearn.ensemble import HistGradientBoostingClassifier
from sklearn.metrics import accuracy_score

def get_entropy(df):
    i = 0
    total = 0
    for column in df.columns:
        counts = df[column].value_counts()
        prob = counts/len(df)
        entropy_value = entropy(prob, base = 2)
        total += entropy_value
        i += 1
    shannon_entropy = total/i
    return shannon_entropy

def check_changes(df_start, df_end):
    # Different shapes => cell removed/added
    if df_start.shape != df_end.shape:
        row_diff = df_end.shape[0] - df_start.shape[0]
        cols_diff = df_end.shape[1] - df_start.shape[1]
        differences = row_diff * df_start.shape[1] + cols_diff * df_start.shape[0]
    # Same shape => cell modified
    else:
        differences = (df_start != df_end).sum().sum()
    return differences

def check_accuracy(df, label):
    try:
        features = [col for col in df.columns if col != label]
        X = df[features]
        y = df[label]
        train_x, test_x, train_y, test_y = train_test_split(X, y, random_state=1)
        tree = HistGradientBoostingClassifier(random_state = 0)
        tree.fit(train_x, train_y)
        y_pred_tree = tree.predict(test_x)
        score_tree = accuracy_score(test_y,y_pred_tree)
        return round(score_tree*100,2)
    except Exception:
        return 'error'