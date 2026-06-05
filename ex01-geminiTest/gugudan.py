def print_gugudan():
    print("--- 구구단 ---")
    for i in range(2, 10):
        print(f"\n[{i}단]")
        for j in range(1, 10):
            print(f"{i} x {j} = {i*j}")

if __name__ == "__main__":
    print_gugudan()
