import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

interface BaseMovieCardProps {
  id: string;
  title: string;
  year: string;
  image?: string;
}

interface EditableMovieCardProps extends BaseMovieCardProps {
  isEditable: true;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

interface NonEditableMovieCardProps extends BaseMovieCardProps {
  isEditable?: false;
}

type MovieCardProps = EditableMovieCardProps | NonEditableMovieCardProps;

const MovieCard: FunctionComponent<MovieCardProps> = (props) => {
  const { id, image, title, year, isEditable } = props;

  const placeholderImage =
    'https://images.placeholders.dev/?width=1000&height=1000&text=%22No%20poster%22';

  const renderActions = isEditable ? (
    <div className="mx-auto flex gap-8 p-4">
      <button className="text-orange-500" onClick={() => props.onEdit(id)}>
        Edit
      </button>
      <button className="text-red-500" onClick={() => props.onDelete(id)}>
        Delete
      </button>
    </div>
  ) : null;

  const cardContent = (
    <div className="flex flex-1 flex-col">
      {image && image !== 'N/A' ? (
        <img className="mx-auto mt-4 h-48" src={image} alt={title} />
      ) : (
        <img className="mx-auto mt-4 h-48" src={placeholderImage} alt={title} />
      )}
      <div className="p-4">
        <h3 className="mt-6 text-sm font-medium text-gray-900">{title}</h3>
        <dl className="mt-1 flex flex-grow flex-col justify-between">
          <dd className="text-sm text-gray-500">{year}</dd>
        </dl>
      </div>
      {renderActions}
    </div>
  );

  return (
    <li className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
      {isEditable ? (
        <div>{cardContent}</div>
      ) : (
        <Link to={`/detail/${id}`}>{cardContent}</Link>
      )}
    </li>
  );
};

export default MovieCard;
