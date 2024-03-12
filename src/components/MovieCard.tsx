import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

interface BaseMovieCardProps {
  id: string;
  image: string;
  title: string;
  year: string;
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

  const renderActions = isEditable ? (  
    <div className="p-4 flex gap-8 mx-auto">
      <button className="text-orange-500" onClick={() => (props as EditableMovieCardProps).onEdit(id)}>Edit</button>
      <button className="text-red-500" onClick={() => (props as EditableMovieCardProps).onDelete(id)}>Delete</button>
    </div>
  ) : null;

  const cardContent = (
    <div className="flex-1 flex flex-col">
      {image ? (
        <img className="h-48 mx-auto mt-4" src={image} alt={title} />
      ) : (
        <img 
          className="h-48 mx-auto mt-4" 
          src={'https://images.placeholders.dev/?width=1000&height=1000&text=%22No%20poster%22'} 
          alt={title} 
        />
      )}
      <div className="p-4">
        <h3 className="mt-6 text-gray-900 text-sm font-medium">{title}</h3>
        <dl className="mt-1 flex-grow flex flex-col justify-between">
          <dd className="text-gray-500 text-sm">{year}</dd>
        </dl>
      </div>
      {renderActions}
    </div>
  );

  return (
    <li className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
      {isEditable ? (
        <div>{cardContent}</div>
      ) : (
        <Link to={`/detail/${id}`}>{cardContent}</Link>
      )}
    </li>
  );
};

export default MovieCard;
