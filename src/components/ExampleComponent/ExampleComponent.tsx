import styles from './ExampleComponent.module.css';

export const ExampleComponent = () => {
  const myString =
    'My very own stringMy very own stringMy very own stringMy very own stringMy very own stringMy very own stringMy very own stringMy very own string';

  return (
    <div>
      <span className={styles.exampleText}>
        This is an example component with: {myString}
      </span>
    </div>
  );
};
