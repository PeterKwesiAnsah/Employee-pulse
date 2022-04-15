import Button, { ButtonVariant } from '../../Components/Button';
import IconButton, { IconButtonVariant } from '../../Components/IconButton';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase';
import { collection } from 'firebase/firestore';
import useCopyToClipboard from '../../Hooks/useCopyToClipboard';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function SurveyListPage() {
  const [surveysCollection, loading, error] = useCollection(
    collection(db, 'surveys')
  );
  const [, copy] = useCopyToClipboard();
  const navigate = useNavigate();

  const handleCopyLink = (id: string) => () => {
    const domain =
      window.location.hostname === 'localhost' ? 'http://' : 'https://';
    const link = `${domain}${window.location.host}/survey/${id}`;
    copy(link);
    toast.success('Link copied to clipboard');
  };

  const handleOnMoreButton = (id: string) => () => {
    navigate(`/survey/${id}`);
  };

  return (
    <div className="container mt-10 m-auto px-4 md:px-8 text-center">
      <h1 className="text-center font-bold text-4xl ">Surveys</h1>
      <div className="flex flex-col items-center justify-center py-4">
        <p>
          {
            // TODO: add user friendly error message
            error && <strong>Error: {JSON.stringify(error)}</strong>
          }
          {
            // TODO: add fancy loading
            loading && <span>Loading...</span>
          }
        </p>
        {surveysCollection && surveysCollection.docs?.length > 0 && (
          <table className="text-sm sm:text-base table-auto">
            <thead>
              <tr>
                <th className="sm:p-2">No.</th>
                <th className="sm:p-2">Time</th>
                <th className="sm:p-2">Question</th>
                <th className="sm:p-2" />
                <th className="sm:p-2" />
                <th className="sm:p-2" />
              </tr>
            </thead>
            <tbody>
              {surveysCollection.docs.map((doc, index) => {
                const survey = doc.data();
                return (
                  <tr key={doc.id}>
                    <td className="sm:p-2">{(index += 1)}.</td>
                    <td className="sm:p-2">
                      {survey.createdDate.toDate().toDateString()}
                    </td>
                    <td className="sm:p-2">{survey.title}</td>
                    <td className="sm:p-2">
                      <Button
                        onClick={handleOnMoreButton(doc.id)}
                        variant={ButtonVariant.FLAT}
                        className="p-2"
                      >
                        More
                      </Button>
                    </td>
                    <td className="sm:p-2">
                      <IconButton
                        variant={IconButtonVariant.PRIMARY}
                        className="p-2"
                        title="Download"
                        icon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                          </svg>
                        }
                      ></IconButton>
                    </td>
                    <td className="sm:p-2">
                      <IconButton
                        variant={IconButtonVariant.PRIMARY}
                        className="p-2"
                        title="Copy link to clipboard"
                        onClick={handleCopyLink(doc.id)}
                        icon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                            />
                          </svg>
                        }
                      ></IconButton>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
export default SurveyListPage;
