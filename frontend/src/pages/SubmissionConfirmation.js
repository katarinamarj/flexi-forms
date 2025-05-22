import logo from '../images/logo.png';

const SubmissionConfirmation = () => {
  return (
    <div style={{
      minHeight: '80rem', 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '4rem 2rem 2rem',
      fontFamily: 'Arial, sans-serif',
    }}>
      
      <div style={{ marginBottom: '2rem' }}>
        <img src={logo} alt="Logo" style={{ height: '3.125rem' }} /> 
      </div>

      <div style={{
        padding: '2rem 3rem',
        borderRadius: '0.75rem', 
        boxShadow: '0 0.25rem 0.75rem rgba(0,0,0,0.1)', 
        textAlign: 'center',
        maxWidth: '31.25rem', 
      }}>
        <h2 style={{ marginBottom: '1rem', color: '#333' }}>
          Thank you for submitting the form!
        </h2>
        <p style={{ fontSize: '1.1rem', color: '#555' }}>
          Your response has been successfully recorded.
        </p>
      </div>
    </div>
  );
};

export default SubmissionConfirmation;
