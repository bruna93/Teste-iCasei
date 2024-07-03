import { controller } from "./index";
import { google } from "googleapis";

jest.mock("googleapis", () => ({
  google: {
    youtube: jest.fn().mockReturnValue({
      search: {
        list: jest.fn().mockResolvedValue({
          data: {
            items: [
              { id: 1, snippet: { title: "Video 1" } },
              { id: 2, snippet: { title: "Video 2" } },
            ],
          },
        }),
      },
    }),
  },
}));

describe("fetchYoutubeVideos", () => {
  it("should fetch videos for a valid query", async () => {
    const query = "test query";
    const result = await controller.fetchYoutubeVideos(query);

    expect(google.youtube).toHaveBeenCalledWith({
      auth: process.env.GOOGLE_API_KEY,
      version: "v3",
    });
    expect(google.youtube({ version: "v3" }).search.list).toHaveBeenCalledWith({
      q: query,
      part: ["snippet"],
      maxResults: 8,
    });
    expect(result).toEqual([
      { id: 1, snippet: { title: "Video 1" } },
      { id: 2, snippet: { title: "Video 2" } },
    ]);
  });
});
