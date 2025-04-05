import styles from './css/ConfirmationPage.module.css';


export default function ConfirmationPage() {
  // Color variables
  const ivoryCoastOrange = "#F77F00";
  const ivoryCoastWhite = "#FFFFFF";
  const ivoryCoastGreen = "#00A86B";
  const darkGray = "#333333";
  const mediumGray = "#666666";
  const lightGray = "#F8F9FA";
  const borderColor = "#E5E7EB"; // Light gray for subtle borders

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: lightGray }}>
      <div
        className="bg-white p-10 rounded-xl w-full max-w-lg"
        style={{
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
          border: `1px solid ${borderColor}`,
          borderTop: `4px solid ${ivoryCoastGreen}`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Optional subtle decorative element */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            backgroundColor: ivoryCoastGreen,
            opacity: 0.1
          }}
        />
        
        {/* Checkmark icon */}
        <div className="flex justify-center mb-8">
          <div 
            className="rounded-full flex items-center justify-center"
            style={{
              backgroundColor: ivoryCoastGreen,
              width: '80px',
              height: '80px',
              boxShadow: '0 4px 12px rgba(0, 168, 107, 0.3)',
              border: `2px solid ${ivoryCoastWhite}`
            }}
          >
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        
        {/* Content */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4" style={{ color: darkGray }}>
            Inscription Confirmée!
          </h1>
          
          <div 
            className="space-y-4 mb-8 p-4 rounded-lg" 
            style={{
              backgroundColor: '#FCFCFC',
              border: `1px solid ${borderColor}`
            }}
          >
            <p className="text-lg" style={{ color: mediumGray }}>
              Merci pour votre inscription à la CAN 2025 MAROCAINE! Nous sommes ravis de vous accueillir.
            </p>
            <p className="text-lg" style={{ color: mediumGray }}>
              Vous recevrez un email de confirmation et l&apos;un de nos collaborateurs vous contactera sous peu.
            </p>
          </div>
        </div>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <a
            href="/"
            className="px-6 py-3 rounded-lg font-semibold text-center transition-all duration-300 hover:shadow-md"
            style={{ 
              backgroundColor: ivoryCoastWhite,
              color: ivoryCoastGreen,
              border: `2px solid ${ivoryCoastGreen}`,
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
            }}
          >
            Retour à l&apos;accueil
          </a>
          <a
            href="/account"
            className="px-6 py-3 rounded-lg font-semibold text-center transition-all duration-300 hover:shadow-lg"
            style={{ 
              backgroundColor: ivoryCoastOrange,
              color: ivoryCoastWhite,
              boxShadow: '0 2px 5px rgba(247, 127, 0, 0.3)'
            }}
          >
            Accéder à votre compte
          </a>
        </div>
      </div>
    </div>
  );
}