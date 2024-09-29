import { Repository } from "typeorm";
import { EventBookmarks } from "../entities/Event";

export class EventBookmarkService {
  private eventBookmarksRepository: Repository<EventBookmarks>;

  constructor(eventBookmarksRepository: Repository<EventBookmarks>) {
    this.eventBookmarksRepository = eventBookmarksRepository;
  }

  async getAllBookmarks(): Promise<EventBookmarks[]> {
    return await this.eventBookmarksRepository.find({ relations: ['event'] });
  }

  async createBookmark(userId: string, eventId: number): Promise<EventBookmarks> {
    const newBookmark = this.eventBookmarksRepository.create({ userId, event: { id: eventId } });
    return await this.eventBookmarksRepository.save(newBookmark);
  }

  async deleteBookmark(id: number): Promise<EventBookmarks | null> {
    const bookmark = await this.eventBookmarksRepository.findOneBy({ id });
    if (!bookmark) return null;
    await this.eventBookmarksRepository.softDelete({ id });
    return bookmark;
  }
}