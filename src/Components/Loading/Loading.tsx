import './Loading.css'; 

interface LoadingProps {
  isLoading: boolean; 
  text?: string;     
}

function Loading(props: LoadingProps){
  if (!props.isLoading) {
    return null; 
  }

  return (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
      {props.text && <p className="loading-text">{props.text}</p>}
    </div>
  );
};

export default Loading;